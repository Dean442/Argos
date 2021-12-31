package akros.projectoverview.Argos.persistence.entities.documents;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Document("employee")
public class EmployeeDocument {

    @Id
    private String id;

    private String name;

    private String firstName;

    private String profile;

    private String businessfield;

    private String teamLeader;

    private List<String> mandates;

    private int happiness;

    private String health;


}
