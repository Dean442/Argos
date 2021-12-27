package akros.projectoverview.Argos.persistence.entities.documents;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Document
public class IdList {

    private List<String> ids;

    private String caller;
}
